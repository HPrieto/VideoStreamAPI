'use strict';

/**
 * Module dependencies
 * @private
 */
var bcrypt = require('bcrypt');

/**
 * Module variables.
 * @private
 */
var saltRounds = 10;
var nameRegExp = "^" +
	"(?=.{2,})"; // 1 character or longer` 
var usernameRegExp = "^" +
	"(?=.*[a-zA-Z\_])" + 	// only letters and dashes allowed
	"(?=.{2,})"; 			// 2 characters or longer
var passwordRegExp = "^" +
	"(?=.*[a-z])" + // 1 lowercase letter
	"(?=.*[A-Z])" + // 1 uppercase letter
	"(?=.*[0-9])" + // 1 numeric
	// "(?=.*[!@#$%^&*])" + // 1 special character from list
	"(?=.{6,})"; 	// 6 characters or longer
var emailRegExp = "^" +
	"(?=.*[@])" + 	// all emails contains "." and "@" characters
	"(?=.{3,})"; 	// email should be at least 3 characters long

/**
 Module utitily methods.
 @public
 */
 
/**
 * Returns 'true' if password parameter field, when hashed, matches hash
 *
 * @param {string} password
 * @param {string} hash
 * @public
 */
exports.matching = (password, hash) => {
	return typeof password === "string" && typeof hash === "string" && bcrypt.compareSync(password, hash);
};

/**
 * Returns a hashed representation of string parameter
 * 
 * @param {string} str
 * @public
 */
exports.encrypted = (str) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(str, salt);
};

/**
 * Returns 'true' if string parameters is a valid name
 * 
 * @param {string} str
 * @public
 */
exports.isName = (str) => {
	return isString(str, nameRegExp);
};

/**
 * Returns 'true' if string parameters is valid username
 * 
 * @param {string} str
 * @public
 */
exports.isUsername = (str) => {
	return isString(str,usernameRegExp);
};

/**
 * Returns 'true' if string parameters is valid passowrd
 * 
 * @param {string} str
 * @public
 */
exports.isPassword = (str) => {
	return isString(str, passwordRegExp);
};

/**
 * @desc Returns 'true' if string parameters is valid email address
 * 
 * @param {string} str
 * @public
 */
exports.isEmail = (str) => {
	return isString(str,emailRegExp);
};

/**
 * Returns 'true' if str parameter matches regular expression
 * 
 * @param {string} str
 * @public
 */
function isString(str, exp) {
	var regExp = new RegExp(exp);
	return typeof str === "string" & regExp.test(str); 
};
 
exports.isString = isString;

/**
 * @title Validate Date String.
 * 
 * @desc Checks if string is a valid date.
 * 
 * @param {string} str
 * @returns {bool}
 * @public
 */
 exports.isDateString = (str) => {
 	if (Date.parse(str)) {
 		return false;
 	}
 	return false;
 };
 
 /**
  * @title Validate Date Object.
  * 
  * @param {date} dateObj
  * @returns {bool}
  * @public
  */
 exports.isDate = (dateObj) => {
 	return dateObj instanceof Date && !isNaN(dateObj);
 };