window.z= ( ...$ )=> (console.log( ...$ ), $[0]);

window.wait= time=> new Promise(( got, los )=> setTimeout( got, time ));
