// Nestjs
import { ConfigModule, ConfigService } from '@nestjs/config';
// Adminjs
import { AdminModule } from '@adminjs/nestjs';
// Locale
import kr from './locale/kr';
// Resource
import { userResource } from '../modules/user/admins/user.resource';
import { deliveryResource } from '../modules/delivery/admins/delivery.resource';
import { deliveryCancelResource } from '../modules/delivery/admins/delivery-cancel.resource';
import { deliveryPrepareResource } from '../modules/delivery/admins/delivery-prepare.resource';
import { cardResource } from '../modules/card/admins/card.resource';
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
        // Card
        cardResource,
        // Delivery
        deliveryPrepareResource,
        deliveryResource,
        deliveryCancelResource,
      ],
      locale: kr,
      branding: {
        companyName: `${config.get('SERVICE_TITLE')} | ${config.get('COMPANY_TITLE')}`,
        softwareBrothers: false,
        // logo: '',
        // favicon: '',
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
