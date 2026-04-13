import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const updateBlogCMSValidation: ValidationChain[] = [
    // Hero Section
    body('hero.enabled').optional().isBoolean(),
    body('hero.headline').optional().trim().isString(),
    body('hero.subHeadline').optional().trim().isString(),

    // Search Filters
    body('searchFilters.enabled').optional().isBoolean(),
    body('searchFilters.filters').optional().isArray(),
    body('searchFilters.filters.*.label').optional().trim().isString(),
    body('searchFilters.filters.*.value').optional().trim().isString(),

    // Newsletter Section
    body('newsletter.enabled').optional().isBoolean(),
    body('newsletter.title').optional().trim().isString(),
    body('newsletter.subHeadline').optional().trim().isString(),
    body('newsletter.image').optional().trim().isString(),
];
