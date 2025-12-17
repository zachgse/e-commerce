<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
        $currentYear = (int)now()->format('Y');

        $yearsAvailable = collect($this->resource['yearsAvailable'])->map(function($year) {
            return $year->year;
        })->values()->all();
        
        if (!in_array($currentYear,$yearsAvailable)) array_unshift($yearsAvailable,$currentYear);
        
        $ordersPerMonth = collect($this->resource['dataForSelectedYear'])->map(function($value,$key) use($months){
            $monthName = $months[$key-1];
            return [
                'month' => $monthName,
                'count' => $value 
            ];
        })->values()->all(); 

        return [
            'years_available' => $yearsAvailable,
            'data_for_selected_year' => $ordersPerMonth
        ];
    }
}
