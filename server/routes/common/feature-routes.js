const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

/**
 * @swagger
 * /api/common/feature/add:
 *   post:
 *     summary: Add a feature image
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageUrl
 *               - title
 *               - description
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 description: URL of the feature image
 *               title:
 *                 type: string
 *                 description: Feature title
 *               description:
 *                 type: string
 *                 description: Feature description
 *               link:
 *                 type: string
 *                 description: Optional link for the feature
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the feature is active
 *     responses:
 *       201:
 *         description: Feature image added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/add", addFeatureImage);

/**
 * @swagger
 * /api/common/feature/get:
 *   get:
 *     summary: Get all feature images
 *     tags: [Features]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Feature images retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Feature ID
 *                       imageUrl:
 *                         type: string
 *                         description: Feature image URL
 *                       title:
 *                         type: string
 *                         description: Feature title
 *                       description:
 *                         type: string
 *                         description: Feature description
 *                       link:
 *                         type: string
 *                         description: Feature link
 *                       isActive:
 *                         type: boolean
 *                         description: Whether the feature is active
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/get", getFeatureImages);

module.exports = router;
