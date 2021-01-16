"use static";

const {existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync} = require("fs");
const {join, normalize} = require("path");

module.exports = function (directory) {
	function remove(directory) {
		readdirSync(directory).forEach(file => {
			const current = join(directory, file);

			if (lstatSync(current).isDirectory()) {
				remove(current);
			} else {
				unlinkSync(current);
			}
		});

		rmdirSync(directory);
	}

	directory = normalize(directory);

	if (!existsSync(directory)) {
		return false;
	}

	remove(directory);
	return true;
};
