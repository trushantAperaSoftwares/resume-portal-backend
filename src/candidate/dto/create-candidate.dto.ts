// src/candidate/dto/create-candidate.dto.ts
import { IsNotEmpty, IsEmail, IsOptional, IsString, IsInt, IsArray, IsIn } from 'class-validator';

export class CandidateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  // @IsInt()
  yearsOfExperience: number;

  @IsOptional()
  @IsString()
  education: string;

  @IsNotEmpty()
  // @IsInt()
  // @IsIn([0, 1, 2, 3]) // Notice period: 0, 1, 2, or "More than 2 months"
  noticePeriod: number;

  // @IsArray()
  @IsOptional()
  skills: string | string[];

  // @IsNotEmpty()
  // resume: string; // File path for uploaded resume
}
