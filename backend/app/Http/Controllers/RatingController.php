<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\ApiResponseTrait;
use App\Services\RatingService;
use App\Http\Requests\RatingRequest;

class RatingController extends Controller
{
    use ApiResponseTrait;

    public function __construct(protected RatingService $ratingService)
    {}

    public function create(Request $request,RatingRequest $ratingRequest)
    {
        try {
            $rating = $this->ratingService->createRatingForProduct($request->user(),$ratingRequest->validated());
            return $this->successResponse($rating,200,'Rating has been created');
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }
}
