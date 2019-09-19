/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

$(document).ready(function () {
  var roleName = '';
  var roleId = '';

  $('.move-down-btn').on('click', function () {
    var menuItemId = this.attributes['data-id'].value;
    var levelOrder = parseInt(this.attributes['data-level-order'].value, 10);
    var nextLevelOrder = parseInt(levelOrder, 10) + 1;
    var totalItems = $('#menu-items-table tr').length - 1;

    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function success(data, textStatus, jqXHR) {
        var token = data['access_token'];
        $.ajax({
          url: menuItemMoveDownUrl,
          type: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            menuitemid: menuItemId
          },
          success: function success(data, textStatus, jqXHR) {
            if (data.success) {
              var thisItem = $('tr[data-level-order="' + levelOrder + '"]');
              var nextItem = $('tr[data-level-order="' + nextLevelOrder + '"]');

              var thisAnchor = thisItem.find('td:eq(2)').find('a');

              thisAnchor.removeClass('move-down-btn').addClass('move-up-btn');

              thisAnchor[0].attributes['data-level-order'].value = nextLevelOrder;

              var thisImage = thisItem.find('td:eq(2)').find('i');

              thisImage.removeClass('fa-arrow-alt-circle-down').removeClass('down-arrow').addClass('fa-arrow-alt-circle-up').addClass('up-arrow');

              var nextAnchor = nextItem.find('td:eq(2)').find('a');

              nextAnchor.removeClass('move-up-btn').addClass('move-down-btn');

              nextAnchor[0].attributes['data-level-order'].value = levelOrder;

              var nextImage = nextItem.find('td:eq(2)').find('i');

              nextImage.removeClass('fa-arrow-alt-circle-up').removeClass('up-arrow').addClass('fa-arrow-alt-circle-down').addClass('down-arrow');

              thisItem = $('tr[data-level-order="' + levelOrder + '"]');
              nextItem = $('tr[data-level-order="' + nextLevelOrder + '"]');

              thisItem.remove();

              thisItem.insertAfter(nextItem);

              thisItem = $('tr[data-level-order="' + levelOrder + '"]');
              nextItem = $('tr[data-level-order="' + nextLevelOrder + '"]');

              thisItem[0].attributes['data-level-order'].value = nextLevelOrder;
              nextItem[0].attributes['data-level-order'].value = levelOrder;

              window.location.reload(true);
            } else {
              $('#save-message-div').removeClass('alert-info').addClass('alert-danger');
              $('#save-message-div').html(data.message);
            }

            $('#save-message-div').show();

            return true;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            return false;
          }
        });
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        if (errorThrown == 'unauthorized') {
          window.location.href = '/login';
        }
        return false;
      }
    });
  });

  $('.move-up-btn').on('click', function () {
    var menuItemId = this.attributes['data-id'].value;
    var levelOrder = parseInt(this.attributes['data-level-order'].value, 10);
    var prevLevelOrder = parseInt(levelOrder, 10) - 1;
    var totalItems = $('#menu-items-table tr').length - 1;

    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function success(data, textStatus, jqXHR) {
        var token = data['access_token'];
        $.ajax({
          url: menuItemMoveUpUrl,
          type: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            menuitemid: menuItemId
          },
          success: function success(data, textStatus, jqXHR) {
            if (data.success) {
              var thisItem = $('tr[data-level-order="' + levelOrder + '"]');
              var prevItem = $('tr[data-level-order="' + prevLevelOrder + '"]');

              var thisAnchor = thisItem.find('td:eq(2)').find('a');

              thisAnchor.removeClass('move-down-btn').addClass('move-up-btn');

              thisAnchor[0].attributes['data-level-order'].value = prevLevelOrder;

              var thisImage = thisItem.find('td:eq(2)').find('i');

              thisImage.removeClass('fa-arrow-alt-circle-down').removeClass('down-arrow').addClass('fa-arrow-alt-circle-up').addClass('up-arrow');

              var prevAnchor = prevItem.find('td:eq(2)').find('a');

              prevAnchor.removeClass('move-up-btn').addClass('move-down-btn');

              prevAnchor[0].attributes['data-level-order'].value = levelOrder;

              var prevImage = prevItem.find('td:eq(2)').find('i');

              prevImage.removeClass('fa-arrow-alt-circle-up').removeClass('up-arrow').addClass('fa-arrow-alt-circle-down').addClass('down-arrow');

              thisItem = $('tr[data-level-order="' + levelOrder + '"]');
              prevItem = $('tr[data-level-order="' + prevLevelOrder + '"]');

              thisItem.remove();

              thisItem.insertBefore(prevItem);

              thisItem = $('tr[data-level-order="' + levelOrder + '"]');
              prevItem = $('tr[data-level-order="' + prevLevelOrder + '"]');

              thisItem[0].attributes['data-level-order'].value = prevLevelOrder;
              prevItem[0].attributes['data-level-order'].value = levelOrder;

              window.location.reload(true);
            } else {
              $('#save-message-div').removeClass('alert-info').addClass('alert-danger');
              $('#save-message-div').html(data.message);
            }

            $('#save-message-div').show();

            return true;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            return false;
          }
        });
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        if (errorThrown == 'unauthorized') {
          window.location.href = '/login';
        }
        return false;
      }
    });
  });

  $('.edit-menu-item-btn').on('click', function () {
    var menuId = $('#menu_id').val();
    var menuItemId = this.attributes['data-id'].value;

    window.location.href = menuEditUrl + '?menu_id=' + menuId + '&menu_item_id=' + menuItemId;
  });

  $('#cancel-save-btn').on('click', function () {
    window.location.href = previousMenuItemUrl;
  });

  $('#save-menu-item-details-btn').on('click', function () {
    var menuId = $('#menu_id').val();
    var menuItemId = $('#menu_item_id').val();

    var menuItemText = $('#menu-item-text').val();
    var pageId = $('#page-id').val();
    var anchorUrl = $('#anchor-url').val();
    var divAnchorName = $('#div-anchor-name').val();
    var imageClass = $('#image-class').val();

    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function success(data, textStatus, jqXHR) {
        var token = data['access_token'];
        $.ajax({
          url: menuItemSaveDetailsUrl,
          type: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            menuitemid: menuItemId,
            menuitemtext: menuItemText,
            pageid: pageId,
            anchorurl: anchorUrl,
            divanchorname: divAnchorName,
            imageclass: imageClass
          },
          success: function success(data, textStatus, jqXHR) {
            if (data.success) {
              $('#save-message-div').removeClass('alert-danger').addClass('alert-info');
              $('#save-message-div').html('Menu item was saved successfully');
            } else {
              $('#save-message-div').removeClass('alert-info').addClass('alert-danger');
              $('#save-message-div').html(data.message);
            }

            $('#save-message-div').show();
            setTimeout(function () {
              $('#save-message-div').hide();
            }, 5000);
            return true;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            return false;
          }
        });
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        return false;
      }
    });
  });

  $('#create-menu-item-btn').on('click', function () {
    var menuId = $('#menu_id').val();
    var menuItemId = $('#menu_item_id').val();
    var menuItemParentId = menuItemId == 0 ? null : menuItemId;
    var menuItemText = $('#create-menu-item-text').val();
    var pageId = $('#create-page-id').val();
    var anchorUrl = $('#create-anchor-url').val();
    var divAnchorName = $('#create-div-anchor-name').val();
    var imageClass = $('#create-image-class').val();

    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function success(data, textStatus, jqXHR) {
        var token = data['access_token'];
        $.ajax({
          url: menuItemAddUrl,
          type: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            menuid: menuId,
            menuitemparentid: menuItemId,
            menuitemtext: menuItemText,
            menuitemtype: 'M',
            pageid: pageId,
            anchorurl: anchorUrl,
            divanchorname: '',
            imageclass: imageClass
          },
          success: function success(data, textStatus, jqXHR) {
            if (data.success) {
              if (menuItemParentId) {
                window.location.href = '/menuitems?menu_id=' + menuId + '&menu_item_id=' + menuItemParentId;
              } else {
                window.location.href = '/menuitems?menu_id=' + menuId;
              }
            } else {
              $('#save-message-div').removeClass('alert-info').addClass('alert-danger');
              $('#save-message-div').html(data.message);

              $('#save-message-div').show();
              setTimeout(function () {
                $('#save-message-div').hide();
              }, 5000);
            }
            return false;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            return false;
          }
        });
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        return false;
      }
    });
  });

  $('#save-menu-item-btn').on('click', function () {
    var menuId = $('#menu_id').val();
    var menuItemId = $('#menu_item_id').val();
    var menuItemParentId = $('#menu_item_parent_id').val();
    var menuItemText = $('#menu-item-text').val();
    var pageId = $('#page-id').val();
    var anchorUrl = $('#anchor-url').val();
    var divAnchorName = $('#div-anchor-name').val();
    var imageClass = $('#image-class').val();

    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function success(data, textStatus, jqXHR) {
        var token = data['access_token'];
        $.ajax({
          url: menuItemSaveUrl,
          type: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            menuitemid: menuItemId,
            menuitemtext: menuItemText,
            pageid: pageId,
            anchorurl: anchorUrl,
            divanchorname: divAnchorName,
            imageclass: imageClass
          },
          success: function success(data, textStatus, jqXHR) {
            window.location.href = '/menuitems?menu_id=' + menuId + '&menu_item_id=' + menuItemParentId;
            return false;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            return false;
          }
        });
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        return false;
      }
    });
  });

  $('#create-menu-btn').on('click', function () {
    var menuId = $('#menu_id').val();
    var menuItemId = $('#menu_item_id').val();
    var menuItemText = $('#menu-item-text').val();
    var pageId = $('#page-id').val();
    var divAnchorName = $('#div-anchor-name').val();
    var imageClass = $('#image-class').val();

    /*
    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function (data, textStatus, jqXHR) {
        var token = data['access_token']
        */
    $.ajax({
      url: menuItemAddUrl,
      type: 'GET',
      headers: {
        // Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        menuid: menuId,
        menuitemparentid: menuItemId == 0 ? null : menuItemId,
        menuitemtext: menuItemText,
        menuitemtype: 'G',
        pageid: pageId,
        anchorurl: '',
        divanchorname: divAnchorName,
        imageclass: imageClass
      },
      success: function success(data, textStatus, jqXHR) {
        if (menuItemId != 0) {
          window.location.href = '/menuitems?menu_id=' + menuId + '&menu_item_id=' + menuItemId;
        } else {
          window.location.href = '/menuitems?menu_id=' + menuId;
        }
        return false;
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        return false;
      }
    });
    /*
      },
      error: function (jqXHR, textStatus, errorThrown) {
        return false
      }
     })
    */
  });

  $('#rename-role').on('click', function () {
    roleId = $('#delete-role').data('id');
    roleName = $('#delete-role').data('name');

    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function success(data, textStatus, jqXHR) {
        var token = data['access_token'];
        $.ajax({
          url: roleAddUrl,
          type: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: { roleid: roleId, rolename: roleName },
          success: function success(data, textStatus, jqXHR) {
            window.location.href = '/admin/roles';
            return false;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            return false;
          }
        });
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        return false;
      }
    });

    return false;
  });

  $('.delete-menu-item-btn').on('click', function () {
    globalMenuItemText = this.attributes['data-name'].value;
    globalMenuItemId = this.attributes['data-id'].value;

    $('#delete-menu-item-id').html(globalMenuItemId);
    $('#delete-menu-item-text').html(globalMenuItemText);

    $('#deleteMenuItemModal').modal('show');

    $('#execute-delete-menu-item-btn').on('click', function () {
      $.ajax({
        url: tokenUrl,
        type: 'GET',
        success: function success(data, textStatus, jqXHR) {
          var token = data['access_token'];
          $.ajax({
            url: menuItemDeleteUrl,
            type: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            data: { menuitemid: globalMenuItemId },
            success: function success(data, textStatus, jqXHR) {
              if (data.success) {} else {
                $('#delete-message-div').removeClass('alert-info').addClass('alert-danger');
                $('#delete-message-div').html(data.message);

                $('#delete-message-div').show();

                return;
              }
              if ($('#menu_item_id').val() != '0') {
                window.location.href = '/menuitems?menu_id=' + $('#menu_id').val() + '&menu_item_id=' + $('#menu_item_id').val();
              } else {
                window.location.href = '/menuitems?menu_id=' + $('#menu_id').val();
              }
              // window.location.href = '/admin/roles'
              return false;
            },
            error: function error(jqXHR, textStatus, errorThrown) {
              return false;
            }
          });
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          return false;
        }
      });
    });
  });

  var roleName = '';
  var roleId = '';

  $('#edit-menu-btn').on('click', function () {
    var menuId = $('#edit-menu-btn').data('id');

    window.location.href = menuEditUrl + '?menu_id=' + menuId;

    return false;
  });

  $('#add-menu-btn').on('click', function () {
    menuName = $('#menu-name-input').val();

    /*
    $.ajax({
      url: tokenUrl,
      type: 'GET',
      success: function (data, textStatus, jqXHR) {
        var token = data['access_token']
        */
    $.ajax({
      url: menuAddUrl,
      type: 'GET',
      headers: {
        // Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: { name: menuName },
      success: function success(response, textStatus, jqXHR) {
        if (response.success) {
          window.location.href = menuEditUrl + '?menu_id=' + response.data.id;
        }
        return false;
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        return false;
      }
    });
    /*
      },
      error: function (jqXHR, textStatus, errorThrown) {
        return false
      }
    })
    */
    return false;
  });

  $('.edit-menu-btn').on('click', function () {
    window.location.href = menuEditUrl + '?menu_id=' + this.attributes['data-id'].value;
  });

  $('.delete-role-btn').on('click', function () {
    globalRoleName = this.attributes['data-name'].value;
    globalRoleId = this.attributes['data-id'].value;

    $('#role-name').html(roleName);

    $('#deleteRoleModal').modal('show');

    $('#execute-delete-role-btn').on('click', function () {
      $.ajax({
        url: tokenUrl,
        type: 'GET',
        success: function success(data, textStatus, jqXHR) {
          var token = data['access_token'];
          $.ajax({
            url: roleDeleteUrl,
            type: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            data: { roleid: globalRoleId, rolename: globalRoleName },
            success: function success(data, textStatus, jqXHR) {
              window.location.href = '/admin/roles';
              return false;
            },
            error: function error(jqXHR, textStatus, errorThrown) {
              return false;
            }
          });
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          return false;
        }
      });
    });
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);