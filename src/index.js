"use static";

const {existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync} = require("fs");
const {join, normalize} = require("path");

/**
 * Recursively deletes a directory (folder) from the filesystem.
 *
 * @param {string} directory - The path to the directory, e.g. "path/to/directory".
 * @returns {boolean} True if successful.
 */
function deltree(directory) {
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
}

module.exports = deltree;
