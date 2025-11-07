<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            // Basic Info
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('designation')->nullable();

            // Education
            $table->string('education')->nullable();
            $table->decimal('education_score', 5, 2)->nullable();

            // Low Certificate
            $table->string('certificate_low')->nullable();
            $table->decimal('certificate_low_score', 5, 2)->nullable();

            // Medium Certificate
            $table->string('certificate_medium')->nullable();
            $table->decimal('certificate_medium_score', 5, 2)->nullable();
            
            // High Certificate
            $table->string('certificate_high')->nullable();
            $table->decimal('certificate_high_score', 5, 2)->nullable();

            // Experience - External
            $table->string('experience_external')->nullable();
            $table->decimal('experience_external_score', 5, 2)->nullable();

            // Experience - Management
            $table->string('experience_management')->nullable();
            $table->decimal('experience_management_score', 5, 2)->nullable();

            // Experience - Internal -excl management
            $table->string('experience_internal')->nullable();
            $table->decimal('experience_internal_score', 5, 2)->nullable();
            
            // Experience - Internal -management
            $table->string('experience_internal_management')->nullable();
            $table->decimal('experience_internal_management_score', 5, 2)->nullable();

            // English
            $table->string('english')->nullable();
            $table->decimal('english_score', 5, 2)->nullable();

            // Total Calculated Fields
            $table->decimal('total_score', 6, 2)->nullable();
            $table->string('grade', 10)->nullable();

            // HR Decision Fields
            $table->string('insurance_bracket')->nullable();
            $table->string('bonus')->nullable();
            $table->string('off_days')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
