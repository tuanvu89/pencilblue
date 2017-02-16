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
const _ = require('lodash');
const SettingServiceFactory = require('./system/settings');
const SiteService = require('./service/entities/site_service');
const SiteUtils = require('../lib/utils/siteUtils');

/**
 * Service for content settings retrieval
 * TODO [1.0] Remove this class and use the setting service as intended
 * @module Services
 * @class ContentService
 * @constructor
 */
class ContentService {
    constructor(options) {
        if (options) {
            this.siteUid = SiteService.getCurrentSite(options.site) || SiteUtils.GLOBAL_SITE;
            this.onlyThisSite = options.onlyThisSite || false;
        } else {
            this.siteUid = SiteUtils.GLOBAL_SITE;
            this.onlyThisSite = false;
        }
        this.settingService = SettingServiceFactory.getServiceBySite(this.siteUid, this.onlyThisSite);
    }

    /**
     *
     * @private
     * @static
     * @readonly
     * @property CONTENT_SETTINGS_REF
     * @type {String}
     */
    static get CONTENT_SETTINGS_REF() {
        return 'content_settings';
    }

    /**
     *
     * @private
     * @static
     * @readonly
     * @property DEFAULT_SETTINGS
     * @type {String}
     */
    static get DEFAULT_SETTINGS() {
        return Object.freeze({
            articles_per_page: 5,
            auto_break_articles: 0,
            read_more_text: 'Read more',
            display_timestamp: 1,
            date_format: 'M dd, YYYY',
            two_digit_date: 0,
            display_hours_minutes: 1,
            time_format: '12',
            two_digit_time: 0,
            display_bylines: 1,
            display_author_photo: 1,
            display_author_position: 1,
            allow_comments: 1,
            default_comments: 1,
            require_account: 0,
            require_verification: 0
        });
    }

    /**
     * A long named alias of 'get'
     * //TODO [1.0] remove duplicate naming
     * @method getSettings
     * @param {Function} cb Callback function
     */
    getSettings (cb) {
        this.get(cb);
    }

    /**
     * Retrieves the content settings.  When settings are not found in storage
     * the service will generate defaults and persist them.
     * @method get
     * @param {Function} cb Callback function
     */
    get  (cb) {
        var self = this;
        this.settingService.get(ContentService.CONTENT_SETTINGS_REF, function (err, settings) {
            if (settings) {
                return cb(err, settings);
            }

            //set default settings if they don't exist
            settings = ContentService.getDefaultSettings();
            self.settingService.set(ContentService.CONTENT_SETTINGS_REF, settings, function (err, result) {
                cb(err, settings);
            });
        });
    }

    /**
     * Retrieves the default content settings from installation
     * TODO [1.0] remove because of static property
     * @method getDefaultSettings
     * @return {Object} Content settings
     */
    static getDefaultSettings  () {
        return _.clone(ContentService.DEFAULT_SETTINGS);
    }

    /**
     * Returns a formatted time stamp from a date
     *
     * @method getTimestampTextFromSettings
     * @param {Date} date
     * @param {Object} contentSettings
     * @param {Localization} ls
     */
    static getTimestampTextFromSettings  (date, contentSettings, ls) {
        var options = {
            date: date,
            format: contentSettings.date_format,
            twoDigitDate: contentSettings.two_digit_date,
            displayTime: contentSettings.display_hours_minutes,
            timeFormat: contentSettings.time_format,
            twoDigitTime: contentSettings.two_digit_time,
            ls: ls
        };
        return ContentService.getTimestampText(options);
    }

    /**
     * TODO [1.0] document remove check for instance of localization service
     * @static
     * @method getTimestampText
     * @param {Object} options
     * @param {Date} options.date
     * @param {String} options.format
     * @param {Boolean} options.twoDigitDate
     * @param {Boolean} options.displayTime
     * @param {String} options.timeFormat
     * @param {Boolean} options.twoDigitTime
     * @param {Localization} options.ls
     */
    static getTimestampText  (options) {
        var date = options.date;
        var format = options.format;
        var twoDigitDate = options.twoDigitDate;
        var displayTime = options.displayTime;
        var timeFormat = options.timeFormat;
        var twoDigitTime = options.twoDigitTime;
        var ls = options.ls;

        var dateString = format;
        var monthNames = [
            ls.g('timestamp.JAN'),
            ls.g('timestamp.FEB'),
            ls.g('timestamp.MAR'),
            ls.g('timestamp.APR'),
            ls.g('timestamp.MAY'),
            ls.g('timestamp.JUN'),
            ls.g('timestamp.JUL'),
            ls.g('timestamp.AUG'),
            ls.g('timestamp.SEP'),
            ls.g('timestamp.OCT'),
            ls.g('timestamp.NOV'),
            ls.g('timestamp.DEC')
        ];

        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = (twoDigitDate && month < 10) ? '0' + month : month.toString();
        day = (twoDigitDate && day < 10) ? '0' + day : day.toString();

        dateString = dateString.split('YYYY').join(date.getFullYear())
            .split('yy').join(date.getYear())
            .split('M').join(monthNames[date.getMonth()])
            .split('mm').join(month)
            .split('dd').join(day);

        if (typeof displayTime !== 'undefined' && displayTime) {

            var hours = date.getHours();
            var minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            var ampm = '';

            //format for 12 hour time
            if (timeFormat === '12') {
                if (hours > 12) {
                    hours -= 12;
                    ampm = ' ' + ls.g('timestamp.TIME_PM');
                }
                else {
                    ampm = ' ' + ls.g('timestamp.TIME_AM');
                }
            }
            if (twoDigitTime && hours < 10) {
                hours = '0' + hours;
            }

            dateString = dateString.concat(' ' + hours + ':' + minutes + ampm);
        }
        return dateString;
    }
}

//exports
module.exports = ContentService;
