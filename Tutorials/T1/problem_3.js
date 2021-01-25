function landscape() {
  let result = "";
  let result_up = "";
  function flat(size) {
    for (let count = 0; count < size; count++){
      result += "_";
      result_up += " ";
	}
  }

  function hill(size) {
    result += "/";
    result_up += " ";
    for (let count = 0; count < size; count++){
      result_up += "_";
      result += " ";
	}
    result += "\\";
    result_up += " ";
  }

  //START BUILD SCRIPT
  flat(3);
  hill(4);
  flat(8);
  hill(4);
  flat(2);
  //END BUILD SCRIPT
  console.log(result_up)
  return result;
}

console.log("")
console.log(landscape())
