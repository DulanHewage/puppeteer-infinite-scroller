function writeToFile(filename, content) {
  try {
    // Write content into the file
    fs.writeFileSync(filename, content);

    // Return success message
    return "Content written to the file successfully!";
  } catch (error) {
    // Return error message if any error occurs
    return "Error occurred while writing to the file: " + error.message;
  }
}

exports.writeToFile = writeToFile;
