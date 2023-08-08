function syncFunction() {
    console.log("Step 1");
    new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Step 2");
  }
  
syncFunction();
console.log("End");
//Step 1
// Step 2
// End

async function asyncFunction() {
console.log("Step 1");
await new Promise(resolve => setTimeout(resolve, 1000));
console.log("Step 2");
}

asyncFunction();
console.log("End");

// Step 1
// End
// Step 2
