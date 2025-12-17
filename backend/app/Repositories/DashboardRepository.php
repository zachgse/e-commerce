<?php

namespace App\Repositories;

use App\Interfaces\DashboardInterface;
use App\Models\{Product,Payment,User,Rating,Order};
use Illuminate\Database\Query\JoinClause;
use DB;

class DashboardRepository implements DashboardInterface 
{
    public function statistics()
    {
        $totalProductsSold = Product::sum('total_sold');
        $totalRevenue = Payment::where('status','success')->sum('order_amount');
        $registeredUsers = User::where('id','<>',1)->count();
        $avgReview = Rating::avg('rate');

        return [
            'total_products_sold' => (int)$totalProductsSold,
            'total_revenue' => (float)$totalRevenue,
            'total_users' => $registeredUsers,
            'avg_review' => (float)$avgReview
        ];
    }

    public function chart(string $module,int $year)
    {
        if ($module != 'order_status') {
            $years = DB::table($module)
                        ->selectRaw('DISTINCT(YEAR(created_at)) as year')
                        ->get();
        }

        switch ($module){
            case "order_status":
                return Order::selectRaw('status,COUNT(*) as total')->groupBy('status')->get();
                break;
            case "payments":
                $data = DB::table($module)
                    ->selectRaw('MONTH(created_at) as month ,SUM(order_amount) as total')
                    ->whereYear('created_at',$year)
                    ->where('deleted_at',null)
                    ->groupBy('month')
                    ->orderBy('month')
                    ->get();
                break;
            default:
                $data = DB::table($module)
                    ->selectRaw('MONTH(created_at) as month ,COUNT(*) as total')
                    ->whereYear('created_at',$year)
                    ->groupBy('month')
                    ->orderBy('month')
                    ->get();
                break;
        }

        $months = array_fill(1,12,0);
        foreach($data as $d) {
            $months[$d->month] = (float)$d->total;
        }

        return [
            'yearsAvailable' => $years,
            'dataForSelectedYear' => $months
        ];
    }

    public function productStats(string $filterBy,string $filterOrder)
    {
        $products = null;
        switch($filterBy){
            case "ratings":
                $products = Product::with('thumbnail_image')
                    ->joinSub(
                        DB::table('ratings')
                            ->select('product_id', DB::raw('AVG(rate) as rate'))
                            ->whereNull('deleted_at')
                            ->groupBy('product_id'),
                        'rating_avg',
                        'rating_avg.product_id',
                        '=',
                        'products.id'
                    )
                    ->orderBy('rating_avg.rate', $filterOrder)
                    ->limit(5)
                    ->get();
                break;
            case "sold":
                $products = Product::where('total_sold','>',0)
                                    ->orderBy('total_sold',$filterOrder)
                                    ->limit(5)
                                    ->get();
                break;
            case "stocks":
                $products = Product::orderBy('stock',$filterOrder)->limit(5)->get();
                break;
            default:
                break;
        }

        return $products;
    }

    public function transactions()
    {
        return Payment::where('status','success')
                        ->orderBy('created_at','DESC')
                        ->limit(5)
                        ->get();
    }
}