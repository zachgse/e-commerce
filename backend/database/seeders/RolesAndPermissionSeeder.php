<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name'=>'view_products']);
        Permission::create(['name'=>'manage_dashboard']);
        $admin = Role::create(['name'=>'admin']);
        $admin->givePermissionTo(Permission::all());

        $customer = Role::create(['name'=>'customer']);
        $customer->givePermissionTo('view_products');
    }
}
