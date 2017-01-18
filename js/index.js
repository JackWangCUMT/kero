/**
 * Module : Kero webpack entry index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-08 15:24:46
 */

import {
    App,
    processXHRError,
    createApp
} from './app/indexApp';

window.App = App;
window.processXHRError = processXHRError;

import {
    DataTable
} from './dataTable/indexDataTable';
window.DataTable = DataTable;


import {
    Page
} from './dataTable/indexPage';
window.Page = Page;

import {
    Row
} from './dataTable/indexRow';
window.Row = Row;

window.u = window.u || {};
u = window.u;
u.createApp = createApp;
u.DataTable = DataTable;
u.Row = Row;

export {
    u,
    DataTable
}