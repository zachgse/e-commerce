<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

// uses(RefreshDatabase::class);

it('registration username must be unique', function() {
    // $user = User::factory()->create(['username'=>'zachy_2700']);

    $response = $this->postJson('/api/auth/register', [
        'username' => 'master_admin',
        'name' => 'Test User',
        'email' => 'test@gmail.com',
        'email_verified_at' => now(),
        'password' => bcrypt('admin')
    ]);

    $response->assertStatus(422)
            ->assertJsonValidationErrors('username');
});

it('registration email must be unique', function() {
    $response = $this->postJson('/api/auth/register', [
        'username' => 'test_user',
        'name' => 'Test User',
        'email' => 'master_admin@gmail.com',
        'email_verified_at' => now(),
        'password' => bcrypt('admin')
    ]);

    $response->assertStatus(422)
            ->assertJsonValidationErrors('email');
});

it('registration fields are required', function() {
    $response = $this->postJson('/api/auth/register', [
     
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['username','name','email','password']);
});

it('registration successful', function() {
    $response = $this->postJson('/api/auth/register', [
        'username' => 'test_user',
        'name' => 'Test User',
        'email' => 'test_user@gmail.com',
        'email_verified_at' => now(),
        'password' => bcrypt('admin')
    ]);

    $response->assertStatus(201);
});

it('login fields are required', function() {
    $response = $this->postJson('/api/auth/login', [
        
    ]);

    $response->assertStatus(422)
            ->assertJsonValidationErrors(['email','password']);
});

it('login error credentials', function() {
    $response = $this->postJson('/api/auth/login', [
        'email' => 'testuser@gmail.com',
        'password' => 'asdasd'
    ]);

    $response->assertStatus(401);
});

//account status inactive (soon with middleware)

//email unverified (soon with middleware)

it('login successful', function() {
    $response = $this->postJson('/api/auth/login', [
        'email' => 'master_admin@gmail.com',
        'password' => 'admin'
    ]);

    $response->assertStatus(200);
});