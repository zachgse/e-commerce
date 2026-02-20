<?php

use App\Models\{User,Product};
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\{Role,Permission};

uses(RefreshDatabase::class);

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
    $slug = "polo-shirt";
    $product = Product::factory()->create(['slug'=>$slug]);

    $response = $this->getJson("/api/products/{$slug}");

    $response->assertStatus(200);
});

it('create product with unauthenticated user', function() {
    $response = $this->postJson('/api/admin/products', [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'stock' => 10,
    ]);

    $response->assertStatus(401);
});

it('create product without permission', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'customer']);
    $user->assignRole('customer');
    Sanctum::actingAs($user, ['*']);

    $response = $this->postJson('/api/admin/products', [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'stock' => 10,
    ]);

    $response->assertStatus(403);
});

it('create product with bad request', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'admin']);
    Permission::create(['name'=>'manage_dashboard']);
    $role->givePermissionTo(Permission::all());
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $response = $this->postJson('/api/admin/products', [

    ]);

    $response->assertStatus(422)
            ->assertJsonValidationErrors(['name','description','stock']);
});

it('create product successfully', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'admin']);
    Permission::create(['name'=>'manage_dashboard']);
    $role->givePermissionTo(Permission::all());
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $response = $this->postJson('/api/admin/products', [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'stock' => 10,
        'price' => 40000,
    ]);

    $response->assertStatus(201);
});

it('update product with wrong slug', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'admin']);
    Permission::create(['name'=>'manage_dashboard']);
    $role->givePermissionTo(Permission::all());
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $slug = "daasdqqweqw";

    $response = $this->postJson("/api/admin/products/{$slug}", [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'price' => 100,
        'stock' => 23
    ]);

    $response->assertStatus(404);
});

it('update product without permission', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'customer']);
    $user->assignRole('customer');
    Sanctum::actingAs($user,['*']);

    $slug = "polo-shirt";

    $response = $this->postJson("/api/admin/products/{$slug}", [
        'name' => 'Test Product',
        'description' => 'Test product description',
        'price' => 100,
        'stock' => 23
    ]);

    $response->assertStatus(403);
});

it('update product with bad request', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'admin']);
    Permission::create(['name'=>'manage_dashboard']);
    $role->givePermissionTo(Permission::all());
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $slug = "polo-shirt";
    $product = Product::factory()->create(['slug'=>$slug]);

    $response = $this->postJson("/api/admin/products/{$slug}", [

    ]);

    $response->assertStatus(422);
});

it('update product successfully', function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'admin']);
    Permission::create(['name'=>'manage_dashboard']);
    $role->givePermissionTo(Permission::all());
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $slug = "polo-shirt";
    $product = Product::factory()->create(['slug'=>$slug]);

    $response = $this->postJson("/api/admin/products/{$slug}", [
        'name' => 'Test Product',
        'description' => 'Updated',
        'stock' => 100,
        'price' => 6000
    ]);

    $response->assertStatus(200);
});

it('update product status successfully' , function() {
    $user = User::factory()->create();
    $role = Role::create(['name'=>'admin']);
    Permission::create(['name'=>'manage_dashboard']);
    $role->givePermissionTo(Permission::all());
    $user->assignRole('admin');
    Sanctum::actingAs($user,['*']);

    $slug = "polo-shirt";
    $product = Product::factory()->create(['slug'=>$slug]);

    $response = $this->patchJson("/api/admin/products/{$slug}");

    $response->assertStatus(200);
});