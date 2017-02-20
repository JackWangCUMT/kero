'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.removeRows = exports.removeAllRows = exports.removeRow = exports.removeRowByRowId = undefined;

var _util = require('./util');

var removeRowByRowId = function removeRowByRowId(rowId) {
    var index = this.getIndexByRowId(rowId);
    if (index != -1) this.removeRow(index);
}; /**
    * Module : kero dataTable removeRow
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-08-01 14:34:01
    */


var removeRow = function removeRow(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.removeRows([index]);
};

var removeAllRows = function removeAllRows() {
    this.rows([]);
    this.selectedIndices([]);
    this.focusIndex(-1);
    this.trigger(DataTable.ON_DELETE_ALL);
    this.updateCurrIndex();
};

var removeRows = function removeRows(indices) {
    indices = (0, _util._formatToIndicesArray)(this, indices);
    indices = indices.sort(function (a, b) {
        return a - b;
    });
    var rowIds = [],
        rows = this.rows(),
        deleteRows = [];
    for (var i = indices.length - 1; i >= 0; i--) {
        var index = indices[i];
        var delRow = rows[index];
        if (delRow == null) {
            continue;
        }
        rowIds.push(delRow.rowId);
        var deleteRow = rows.splice(index, 1);
        deleteRows.push(deleteRow[0]);
        this.updateSelectedIndices(index, '-');
        this.updateFocusIndex(index, '-');
    }
    this.rows(rows);
    this.deleteRows = deleteRows;
    this.trigger(DataTable.ON_DELETE, {
        indices: indices,
        rowIds: rowIds,
        deleteRows: deleteRows
    });

    this.updateCurrIndex();
};

/**
 * 清空datatable的所有数据以及分页数据以及index
 */
var clear = function clear() {
    this.removeAllRows();
    this.cachedPages = [];
    this.totalPages(1);
    this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);
};

exports.removeRowByRowId = removeRowByRowId;
exports.removeRow = removeRow;
exports.removeAllRows = removeAllRows;
exports.removeRows = removeRows;
exports.clear = clear;