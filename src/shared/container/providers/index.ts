import './StorageProvider';

// O MailTemplateProvider tem que ser chamado antes do MailProvider, pois o MP depende dele
import './MailTemplateProvider';
import './MailProvider';
import './CacheProvider';
