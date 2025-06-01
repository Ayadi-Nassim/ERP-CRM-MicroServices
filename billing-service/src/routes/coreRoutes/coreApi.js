const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');

const router = express.Router();
const emailController = require('@/controllers/coreControllers/emailController');

const { singleStorageUpload } = require('@/middlewares/uploadMiddleware');


// //____________________________________________ API for Email Templates _________________
router.route('/email/create').post(catchErrors(emailController.create));
router.route('/email/read/:id').get(catchErrors(emailController.read));
router.route('/email/update/:id').patch(catchErrors(emailController.update));
router.route('/email/search').get(catchErrors(emailController.search));
router.route('/email/list').get(catchErrors(emailController.list));
router.route('/email/listAll').get(catchErrors(emailController.listAll));
router.route('/email/filter').get(catchErrors(emailController.filter));

module.exports = router;
