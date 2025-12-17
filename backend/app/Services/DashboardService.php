<?php

namespace App\Services;

use App\Repositories\DashboardRepository;

class DashboardService
{
    public function __construct(protected DashboardRepository $dashboardRepository)
    {}

    public function getStatistics()
    {
        return $this->dashboardRepository->statistics();
    }

    public function getChart(string $module,int $year)
    {
        return $this->dashboardRepository->chart($module,$year);
    }

    public function getProductStats(string $filterBy,string $filterOrder)
    {
        return $this->dashboardRepository->productStats($filterBy,$filterOrder);
    }

    public function getTransactions()
    {
        return $this->dashboardRepository->transactions();
    }
}