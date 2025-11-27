<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageUploader
{
    public function upload(UploadedFile $file, string $directory = "uploads/",string $type) : array
    {
        $disk = env('FILESYSTEM_DISK', 'public'); // Default to 'public' if not set
        $image = $this->resize($file);

        // Create unique filename
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();

        // Encode image to binary string (e.g. JPEG, PNG)
        $encodedImage = $image->encode();

        // Store image to disk manually
        $path = $directory . $filename;
        Storage::disk($disk)->put($path, (string) $encodedImage);

        // Generate accessible URL
        $url = Storage::disk($disk)->url($path);

        return [
            'type' => $type,
            'path' => $path,
            'url' => $url,
            'original_name' => $file->getClientOriginalName(),
            'disk' => $disk,
        ];
    }

    protected function resize(UploadedFile $imageFile, int $maxSize = 1024)
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($imageFile->getRealPath());

        // Resize while maintaining aspect ratio
        $image->scaleDown($maxSize);

        return $image;
    }

    //refactor soon add delete method
}
