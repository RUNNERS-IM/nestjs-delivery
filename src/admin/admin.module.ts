// Nestjs
import { ConfigModule, ConfigService } from '@nestjs/config';

// Adminjs
import { AdminModule } from '@adminjs/nestjs';

// Locale
import kr from './locale/kr';

// Resource
import { userResource } from '../modules/user/admins/user.resource';
import { deliveryResource } from '../modules/delivery/admins/delivery.resource';
import { deliveryHistoryResource } from '../modules/delivery/admins/delivery-history.resource';

// Main section
export const adminjsModule = AdminModule.createAdminAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [
        // User
        userResource,
        // Delivery
        deliveryResource,
        deliveryHistoryResource,
      ],
      locale: kr,
      branding: {
        companyName: `${config.get('SERVICE_TITLE')} | ${config.get('COMPANY_TITLE')}`,
        softwareBrothers: false,
      },
    },
    auth: {
      async authenticate(email, password) {
        if (email === config.get('ADMIN_USERNAME') && password === config.get('ADMIN_PASSWORD')) {
          return Promise.resolve({ email, password });
        }
      },
      cookieName: config.get('COOKIE_NAME') || 'cookieName',
      cookiePassword: config.get('COOKIE_PASSWORD') || 'cookiePassword',
    },
  }),
});
