/*
    Copyright (C) 2016  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict';

//dependencies
var path = require('path');
var Configuration = require('./config');

/**
 * Requirements - Responsible for declaring all of the system types and modules
 * needed to construct the system API object.
 * @class PB
 * @param {Object} config
 * @return {Object} The pb namespace
 */
module.exports = function PB() {
    var config = Configuration.active;
    //define what will become the global entry point into the server api.
    var pb = {

        //make the configuration available
        config: config,

        //initialize logging
        LogFactory: require(config.docRoot + '/include/utils/logging.js'),
        log: require(config.docRoot + '/include/utils/logging.js').newInstance('Default'),

        AsyncEventEmitter: require(config.docRoot + '/include/utils/async_event_emitter.js'),

        //setup the System instance
        System: require(config.docRoot + '/include/system/system.js'),

        //configure cache
        CacheFactory: require(config.docRoot + '/include/dao/cache.js'),

        //configure the DB manager
        DbManager: require(config.docRoot + '/include/dao/db_manager'),

        //setup system class types
        DAO: require(config.docRoot + '/include/dao/dao'),

        //setup validation services
        ValidationService: require(config.docRoot + '/include/validation/validation_service.js'),

        //lock services
        locks: {
            providers: {
                CacheLockProvider: require(config.docRoot + '/include/service/locks/providers/cache_lock_provider.js'),
                DbLockProvider: require(config.docRoot + '/include/service/locks/providers/db_lock_provider.js')
            }
        },
        LockService: require(config.docRoot + '/include/service/locks/lock_service.js'),

        SessionHandler: require(config.docRoot + '/include/session/session.js'),

        BaseObjectService: require(config.docRoot + '/include/service/base_object_service.js'),

        SiteService: require(config.docRoot + '/include/service/entities/site_service.js'),
        SiteQueryService: require(config.docRoot + '/include/service/entities/site_query_service.js'),

        SimpleLayeredService: require(config.docRoot + '/include/service/simple_layered_service.js'),
        MemoryEntityService: require(path.join(config.docRoot, '/include/service/memory_entity_service.js')),
        CacheEntityService: require(path.join(config.docRoot, '/include/service/cache_entity_service.js')),
        DBEntityService: require(path.join(config.docRoot, '/include/service/db_entity_service.js')),
        FSEntityService: require(path.join(config.docRoot, '/include/service/fs_entity_service.js')),
        JSONFSEntityService: require(path.join(config.docRoot, '/include/service/json_fs_entity_service.js')),
        ReadOnlySimpleLayeredService: require(path.join(config.docRoot, '/include/service/read_only_simple_layered_service.js')),
        TemplateEntityService: require(path.join(config.docRoot, '/include/service/template_entity_service.js')),
        CustomObjectService: require(path.join(config.docRoot, 'include/service/entities/custom_object_service.js')),
        TemplateService: require(config.docRoot+'/include/service/entities/template_service.js').TemplateService,
        TemplateValue: require(config.docRoot+'/include/service/entities/template_service.js').TemplateValue,
        SecurityService: require(path.join(config.docRoot, '/include/access_management.js')),

        UsernamePasswordAuthentication: require(config.docRoot + '/include/security/authentication').UsernamePasswordAuthentication,
        FormAuthentication: require(config.docRoot + '/include/security/authentication').FormAuthentication,
        TokenAuthentication: require(config.docRoot + '/include/security/authentication').TokenAuthentication,

        UserService: require(config.docRoot + '/include/service/entities/user_service.js'),

        BaseBodyParser: require(config.docRoot + '/include/http/parsers').BaseBodyParser,
        JsonBodyParser: require(config.docRoot + '/include/http/parsers').JsonBodyParser,
        FormBodyParser: require(config.docRoot + '/include/http/parsers').FormBodyParser,

        BaseController: require(path.join(config.docRoot, '/controllers/base_controller.js')),
        BaseApiController: require(path.join(config.docRoot, '/controllers/api/base_api_controller.js')),
        BaseAdminController: require(path.join(config.docRoot, '/controllers/admin/base_admin_controller.js')),
        ViewController: require(path.join(config.docRoot, '/controllers/view_controller.js')),
        FormController: require(path.join(config.docRoot, '/controllers/form_controller.js')),
        ErrorViewController: require(path.join(config.docRoot, '/controllers/error_controller.js')),
        Router: require(path.join(config.docRoot, '/include/http/router.js')),
        RequestHandler: require(path.join(config.docRoot, '/include/http/request_handler.js')),
        Middleware: require(path.join(config.docRoot, '/include/http/middleware')),

        ErrorsOverTime: require(path.join(config.docRoot, '/include/error/errors_over_time.js')),
        ErrorFormatters: require(path.join(config.docRoot, '/include/error/formatters/error_formatters.js')),

        Localization: require(path.join(config.docRoot, '/include/localization.js')),

        MongoRegistrationProvider: require(config.docRoot + '/include/system/registry/mongo_registration_provider.js'),
        RedisRegistrationProvider: require(config.docRoot + '/include/system/registry/redis_registration_provider.js'),
        ServerRegistration: require(config.docRoot + '/include/system/server_registration.js'),

        RedisCommandBroker: require(path.join(config.docRoot, '/include/system/command/redis_command_broker.js')),
        MongoCommandBroker: require(path.join(config.docRoot, '/include/system/command/mongo_command_broker.js')),
        CommandService: require(path.join(config.docRoot, '/include/system/command/command_service.js')),

        SettingServiceFactory: require(path.join(config.docRoot, '/include/system/settings.js')),

        JobRunner: require(path.join(config.docRoot, '/include/service/jobs/job_runner.js')),
        AsyncJobRunner: require(path.join(config.docRoot, '/include/service/jobs/async_job_runner')),
        ClusterJobRunner: require(path.join(config.docRoot, '/include/service/jobs/cluster_job_runner')),
        PluginJobRunner: require(path.join(config.docRoot, '/include/service/jobs/plugins/plugin_job_runner.js')),
        PluginUninstallJob: require(path.join(config.docRoot, '/include/service/jobs/plugins/plugin_uninstall_job.js')),
        PluginAvailableJob: require(path.join(config.docRoot, '/include/service/jobs/plugins/plugin_available_job.js')),
        PluginDependenciesJob: require(path.join(config.docRoot, '/include/service/jobs/plugins/plugin_dependencies_job.js')),
        PluginInitializeJob: require(path.join(config.docRoot, '/include/service/jobs/plugins/plugin_initialize_job.js')),
        PluginInstallJob: require(path.join(config.docRoot, '/include/service/jobs/plugins/plugin_install_job.js')),

        SiteJobRunner: require(path.join(config.docRoot, '/include/service/jobs/sites/site_job_runner.js')),
        SiteActivateJob: require(path.join(config.docRoot, '/include/service/jobs/sites/site_activate_job.js')),
        SiteDeactivateJob: require(path.join(config.docRoot, '/include/service/jobs/sites/site_deactivate_job.js')),
        SiteCreateEditJob: require(path.join(config.docRoot, '/include/service/jobs/sites/site_create_edit_job.js')),

        EmailService: require(path.join(config.docRoot, '/include/email')),

        ContentService: require(path.join(config.docRoot, '/include/content')),
        LibrariesService: require(path.join(config.docRoot, '/include/libraries.js')),
        ClientJs: require(config.docRoot+'/include/client_js'),

        AdminNavigation: require(path.join(config.docRoot, '/include/admin_navigation'))
    };

    //error on removed items
    [
        'util', 'session', 'validation', 'users', 'settings', 'security', 'DeleteController', 'ApiActionController',
        'HttpStatus', 'PBError', 'DocumentCreator', 'content', 'libraries', 'js', 'ArticleService', 'MediaService'

    ].forEach(function(prop) {
        Object.defineProperty(pb, prop, {
            get: function() {
                throw new Error(prop + ' has been removed from the framework');
            }
        });
    });

    pb.AdminSubnavService = require(path.join(config.docRoot, '/include/service/admin/admin_subnav_service.js'));
    pb.AnalyticsManager   = require(path.join(config.docRoot, '/include/system/analytics_manager.js'));
    pb.UrlService         = require(path.join(config.docRoot, '/include/service/entities/url_service.js'));
    pb.CallHomeService    = require(path.join(config.docRoot, '/include/system/call_home_service.js'));
    pb.JobService         = require(path.join(config.docRoot, '/include/service/entities/job_service.js'));
    pb.TokenService       = require(path.join(config.docRoot, '/include/service/entities/token_service.js'));

    //create plugin service
    pb.PluginService = require(path.join(config.docRoot, '/include/service/entities/plugin_service.js'));
    Object.defineProperty(pb, 'plugins', {
        get: function() {
            pb.log.warn('PencilBlue: pb.plugins is deprecated.  Use new pb.PluginService instead');
            return new pb.PluginService();
        }
    });

    //create plugin setting service
    pb.PluginSettingService = require(path.join(config.docRoot, '/include/service/entities/plugin_setting_service.js'));
    pb.PluginRepository = require(path.join(config.docRoot, '/include/repository/plugin_repository.js'));

    //media renderers
    pb.media = {
        renderers: {
            BaseMediaRenderer: require(path.join(config.docRoot, '/include/service/media/renderers/base_media_renderer.js'))
        },

        providers: {
            FsMediaProvider: require(path.join(config.docRoot, '/include/service/media/fs_media_provider.js')),
            MongoMediaProvider: require(path.join(config.docRoot, '/include/service/media/mongo_media_provider.js'))
        }
    };
    pb.media.renderers.ImageMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/image_media_renderer.js'));
    pb.media.renderers.VideoMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/video_media_renderer.js'));
    pb.media.renderers.YouTubeMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/youtube_media_renderer.js'));
    pb.media.renderers.DailyMotionMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/daily_motion_media_renderer.js'));
    pb.media.renderers.VimeoMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/vimeo_media_renderer.js'));
    pb.media.renderers.VineMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/vine_media_renderer.js'));
    pb.media.renderers.InstagramMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/instagram_media_renderer.js'));
    pb.media.renderers.SlideShareMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/slideshare_media_renderer.js'));
    pb.media.renderers.TrinketMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/trinket_media_renderer.js'));
    pb.media.renderers.StorifyMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/storify_media_renderer.js'));
    pb.media.renderers.KickStarterMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/kickstarter_media_renderer.js'));
    pb.media.renderers.PdfMediaRenderer = require(path.join(config.docRoot, '/include/service/media/renderers/pdf_media_renderer.js'));

    //providers and service
    pb.MediaServiceV2 = require(path.join(config.docRoot, '/include/service/entities/content/media_service_v2.js'));

    //content services
    pb.SectionService = require(config.docRoot+'/include/service/entities/section_service.js');
    pb.TopMenuService = require(config.docRoot+'/include/theme/top_menu.js');

    //object services
    pb.TopicService         = require(path.join(config.docRoot, '/include/service/entities/topic_service.js'));
    pb.ContentObjectService = require(path.join(config.docRoot, '/include/service/entities/content/content_object_service.js'));
    pb.ArticleServiceV2     = require(path.join(config.docRoot, '/include/service/entities/content/article_service_v2.js'));
    pb.ArticleRenderer      = require(path.join(config.docRoot, '/include/service/entities/content/article_renderer.js'));
    pb.PageRenderer         = require(path.join(config.docRoot, '/include/service/entities/content/page_renderer.js'));
    pb.PageService          = require(path.join(config.docRoot, '/include/service/entities/content/page_service.js'));
    pb.ContentViewLoader    = require(path.join(config.docRoot, '/include/service/entities/content/content_view_loader.js'));

    pb.SiteMapService = require(path.join(config.docRoot, '/include/service/entities/site_map_service.js'));

    pb.MediaLoader = require(path.join(config.docRoot, '/include/service/entities/article_service.js')).MediaLoader;
    pb.CommentService        = require(config.docRoot+'/include/theme/comments.js');

    pb.PluginValidationService = require(path.join(config.docRoot, '/include/service/entities/plugins/plugin_validation_service.js'));
    pb.PluginDependencyService = require(path.join(config.docRoot, '/include/service/entities/plugins/plugin_dependency_service.js'));
    pb.NpmPluginDependencyService = require(path.join(config.docRoot, '/include/service/entities/plugins/npm_plugin_dependency_service.js'));
    pb.BowerPluginDependencyService = require(path.join(config.docRoot, '/include/service/entities/plugins/bower_plugin_dependency_service.js'));
    pb.PluginResourceLoader = require(path.join(config.docRoot, '/include/service/entities/plugins/loaders/plugin_resource_loader.js'));
    pb.PluginServiceLoader = require(path.join(config.docRoot, '/include/service/entities/plugins/loaders/plugin_service_loader.js'));
    pb.PluginControllerLoader = require(path.join(config.docRoot, '/include/service/entities/plugins/loaders/plugin_controller_loader.js'));
    pb.PluginLocalizationLoader = require(path.join(config.docRoot, '/include/service/entities/plugins/loaders/plugin_localization_loader.js'));
    pb.PluginInitializationService = require(path.join(config.docRoot, '/include/service/entities/plugins/plugin_initialization_service.js'));

    pb.PasswordResetService = require(path.join(config.docRoot, '/include/service/entities/password_reset_service.js'));

    return pb;
};
