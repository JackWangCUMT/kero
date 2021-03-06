(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './indexEvents', './row-data', './row-getData', './row-getMeta', './row-getSimpleData', './row-init', './row-meta', './row-ref', './row-rowSelect', './row-simpleData', './row-util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./indexEvents'), require('./row-data'), require('./row-getData'), require('./row-getMeta'), require('./row-getSimpleData'), require('./row-init'), require('./row-meta'), require('./row-ref'), require('./row-rowSelect'), require('./row-simpleData'), require('./row-util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.indexEvents, global.rowData, global.rowGetData, global.rowGetMeta, global.rowGetSimpleData, global.rowInit, global.rowMeta, global.rowRef, global.rowRowSelect, global.rowSimpleData, global.rowUtil);
        global.indexRow = mod.exports;
    }
})(this, function (exports, _indexEvents, _rowData, _rowGetData, _rowGetMeta, _rowGetSimpleData, _rowInit, _rowMeta, _rowRef, _rowRowSelect, _rowSimpleData, _rowUtil) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Row = undefined;


    /**
     * Row
     * @namespace
     * @description 前端数据模型行对象
     */

    class Row extends _indexEvents.Events {
        constructor(options) {
            super();
            var self = this;
            /**
             * 当前行的唯一标识
             * @type {string}
             */
            this.rowId = options['id'] || Row.getRandomRowId();
            /**
             * 当前行的状态
             * Row.STATUS.NORMAL('nrm') ：前后端都存在并且保持一致
             * Row.STATUS.UPDATE('upd') ：前后端都存在并且前端进行了修改
             * Row.STATUS.NEW('new') ：后端不存在，前端存在的数据
             * Row.STATUS.DELETE('del') ：后端请求返回的状态，前端判断为此状态则将数据删除
             * Row.STATUS.FALSE_DELETE('fdel') ：后端存在，前端不存在的数据
             * @type {string}
             * @default Row.STATUS.NEW
             */
            this.status = Row.STATUS.NEW;
            /**
             * 当前行对应的DataTable对象
             * @type {u.DataTable}
             */
            this.parent = options['parent'];
            // 当前行的数据信息
            this.data = {};
            // 存储meta改变信息
            this.metaChange = {}; //ko.observable(1)
            // 存储valuecahnge改变信息
            this.valueChange = {};
            // 监听当前行改变
            this.currentRowChange = ko.observable(1);
            // 监听当前行是否选中
            this.selected = ko.pureComputed({
                read: function () {
                    var index = this.parent.getRowIndex(this);
                    var selectindices = this.parent.getSelectedIndices();
                    return selectindices.indexOf(index) != -1;
                },
                owner: this

            });
            // 监听当前行是否为focus
            this.focused = ko.pureComputed({
                read: function () {
                    var index = this.parent.getRowIndex(this);
                    var focusIndex = this.parent.getFocusIndex();
                    return focusIndex == index;
                },
                owner: this

            });
            this.init();
        }
    } /**
       * Module : Kero webpack entry row index
       * Author : liuyk(liuyuekai@yonyou.com)
       * Date   : 2016-08-09 15:24:46
       */

    const RowProto = Row.prototype;
    Object.assign(RowProto, _rowData.rowDataFunObj);
    Object.assign(RowProto, _rowGetData.rowGetDataFunObj);
    Object.assign(RowProto, _rowGetMeta.rowGetMetaFunObj);
    Object.assign(RowProto, _rowGetSimpleData.rowGetSimpleDataFunObj);
    Object.assign(RowProto, _rowInit.rowInitFunObj);
    Object.assign(RowProto, _rowMeta.rowMetaFunObj);
    Object.assign(RowProto, _rowRef.rowRefFunObj);
    Object.assign(RowProto, _rowRowSelect.rowRowSelectFunObj);
    Object.assign(RowProto, _rowSimpleData.rowSimpleDataFunObj);
    Object.assign(RowProto, _rowUtil.rowUtilFunObj);

    Row.STATUS = {
        NORMAL: 'nrm',
        UPDATE: 'upd',
        NEW: 'new',
        DELETE: 'del',
        FALSE_DELETE: 'fdel'
    };

    /*
     * 生成随机行id
     * @private
     */
    Row.getRandomRowId = function () {
        var _id = setTimeout(function () {});
        return _id + '';
    };

    exports.Row = Row;
});