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
        $ordersPerMonth = collect($this->resource['dataForSelectedYear'])->map(function($value,$key) use($months){
            $monthName = $months[$key-1];
            return [
                'month' => $monthName,
                'count' => $value 
            ];
        })->values()->all(); 

        return [
            'years_available' => $this->resource['yearsAvailable'],
            'data_for_selected_year' => $ordersPerMonth
        ];
    }
}
