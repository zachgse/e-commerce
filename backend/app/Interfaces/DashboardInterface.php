<?php

namespace App\Interfaces;

interface DashboardInterface
{
    public function statistics();
    public function chart(string $module,int $year);
    public function productStats(string $filterBy,string $filterOrder);
    public function transactions();
}