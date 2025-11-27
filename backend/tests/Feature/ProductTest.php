<?php

use App\Models\{User,Product};
use Laravel\Sanctum\Sanctum;

it('view list of products', function() {
    $response = $this->getJson('/api/products');

    $response->assertStatus(200);
});

it('view single product with wrong slug', function() {
    $slug = "asdasd";
    $response = $this->getJson("/api/products/{$slug}");

    $response->assertStatus(404);
});

it('view single product successfully', function() {
    $slug = "polo_shirt";

    $response = $this->getJson("/api/products/{$slug}");

    $response->assertStatus(200);
});

it('create product with unauthenticated user', function() {
    $response = $this->postJson('/api/products/create', [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'stock' => 10,
    ]);

    $response->assertStatus(401);
});

it('create product without permission', function() {
    $user = User::factory()->create();
    $user->assignRole('customer');
    Sanctum::actingAs($user, ['*']);

    $response = $this->postJson('/api/products/create', [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'stock' => 10,
    ]);

    $response->assertStatus(403);
});

it('create product with bad request', function() {
    $user = User::factory()->create();
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $response = $this->postJson('/api/products/create', [

    ]);

    $response->assertStatus(422)
            ->assertJsonValidationErrors(['name','description','stock']);
});

// it('create product successfully', function() {
//     $user = User::factory()->create();
//     $user->assignRole('admin');
//     Sanctum::actingAs($user,['*']);

//     $response = $this->postJson('/api/products/create', [
//         'name' => 'Test Product',
//         'description' => 'Test product description',
//         'stock' => 10,
//     ]);

//     $response->assertStatus(201);
// });

it('update product with wrong slug', function() {
    $slug = "asdasd";
    $user = User::factory()->create();
    $user->assignRole('admin');
    Sanctum::actingas($user,['*']);

    $response = $this->patchJson("/api/products/{$slug}/update-info", [
        'name' => 'Test Product',
        'description' => 'Test product description',
    ]);

    $response->assertStatus(404);
});

it('update product without permission', function() {
    $slug = "iphone_13";
    $user = User::factory()->create();
    $user->assignRole('customer');
    Sanctum::actingas($user,['*']);

    $response = $this->patchJson("/api/products/{$slug}/update-info", [
        'name' => 'Test Product',
        'description' => 'Test product description',
    ]);

    $response->assertStatus(403);
});

it('update product with bad request', function() {
    $slug = "test_product";
    $user = User::factory()->create();
    $user->assignRole('admin');
    Sanctum::actingas($user,['*']);

    $response = $this->patchJson("/api/products/{$slug}/update-info", [

    ]);

    $response->assertStatus(400);
});

it('update product successfully', function() {
    $slug = "test_product";
    $user = User::factory()->create();
    $user->assignRole('admin');
    Sanctum::actingas($user,['*']);

    $response = $this->patchJson("/api/products/{$slug}/update-info", [
        'name' => 'Test Product',
        'description' => 'Updated',
    ]);

    $response->assertStatus(201);
});

it('update product stock successfully' , function() {
    $slug = "test_product";
    $user = User::factory()->create();
    $user->assignRole('admin');
    Sanctum::actingas($user,['*']);

    $response = $this->patchJson("/api/products/{$slug}/update-stock", [
        'stock' => 5
    ]);

    $response->assertStatus(201);
});

it('update product status successfully' , function() {
    $slug = "test_product";
    $user = User::factory()->create();
    $user->assignRole('admin');
    Sanctum::actingas($user,['*']);

    $response = $this->patchJson("/api/products/{$slug}/update-status");

    $response->assertStatus(201);
});