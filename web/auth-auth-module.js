(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-auth-module"],{

/***/ "6epW":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./congratulations/congratulations.component */ "g/yd");
/* harmony import */ var _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-account/create-account.component */ "xTvp");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "NEkq");
/* harmony import */ var _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-setup/profile-setup.component */ "y05r");
/* harmony import */ var _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./set-password/set-password.component */ "nKg3");
/* harmony import */ var _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sign-in/sign-in.component */ "G11N");
/* harmony import */ var _verification_verification_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./verification/verification.component */ "eWz8");











const routes = [
    {
        path: 'signin',
        component: _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_7__["SignInComponent"]
    },
    {
        path: 'forgotpassword',
        component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"]
    },
    {
        path: 'createaccount',
        component: _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_3__["CreateAccountComponent"]
    },
    {
        path: 'verification',
        component: _verification_verification_component__WEBPACK_IMPORTED_MODULE_8__["VerificationComponent"]
    },
    {
        path: 'setpassword',
        component: _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_6__["SetPasswordComponent"]
    },
    {
        path: 'profilesetup',
        component: _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_5__["ProfileSetupComponent"]
    },
    {
        path: 'Congratulations',
        component: _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_2__["CongratulationsComponent"]
    }
];
class AuthRoutingModule {
}
AuthRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "Yj9t":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-routing.module */ "6epW");
/* harmony import */ var _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-in/sign-in.component */ "G11N");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "NEkq");
/* harmony import */ var _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./create-account/create-account.component */ "xTvp");
/* harmony import */ var _verification_verification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./verification/verification.component */ "eWz8");
/* harmony import */ var _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./set-password/set-password.component */ "nKg3");
/* harmony import */ var _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./profile-setup/profile-setup.component */ "y05r");
/* harmony import */ var _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./congratulations/congratulations.component */ "g/yd");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "iELJ");
/* harmony import */ var ng_otp_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-otp-input */ "9OaD");













class AuthModule {
}
AuthModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthModule });
AuthModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
            ng_otp_input__WEBPACK_IMPORTED_MODULE_11__["NgOtpInputModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthModule, { declarations: [_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__["SignInComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"], _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_5__["CreateAccountComponent"], _verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"], _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_7__["SetPasswordComponent"], _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_8__["ProfileSetupComponent"], _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_9__["CongratulationsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
        ng_otp_input__WEBPACK_IMPORTED_MODULE_11__["NgOtpInputModule"]], exports: [_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__["SignInComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"], _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_5__["CreateAccountComponent"], _verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"], _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_7__["SetPasswordComponent"], _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_8__["ProfileSetupComponent"], _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_9__["CongratulationsComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__["SignInComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"], _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_5__["CreateAccountComponent"], _verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"], _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_7__["SetPasswordComponent"], _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_8__["ProfileSetupComponent"], _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_9__["CongratulationsComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                    ng_otp_input__WEBPACK_IMPORTED_MODULE_11__["NgOtpInputModule"]
                ],
                exports: [_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__["SignInComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"], _create_account_create_account_component__WEBPACK_IMPORTED_MODULE_5__["CreateAccountComponent"], _verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"], _set_password_set_password_component__WEBPACK_IMPORTED_MODULE_7__["SetPasswordComponent"], _profile_setup_profile_setup_component__WEBPACK_IMPORTED_MODULE_8__["ProfileSetupComponent"], _congratulations_congratulations_component__WEBPACK_IMPORTED_MODULE_9__["CongratulationsComponent"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=auth-auth-module.js.map