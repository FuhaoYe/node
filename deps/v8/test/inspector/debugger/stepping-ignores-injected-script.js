// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

Protocol.Debugger.onPaused(message => {
  let url = InspectorTest._scriptMap.get(message.params.callFrames[0].location.scriptId).url;
  if (url !== 'test.js') {
    InspectorTest.log('InjectedSciptSource on stack.');
    InspectorTest.completeTest();
  }
  Protocol.Debugger.stepInto();
});

InspectorTest.setupScriptMap();
Protocol.Debugger.enable();
Protocol.Debugger.pause();
Protocol.Runtime.evaluate({expression: 'console.log(42)//# sourceURL=test.js'})
  .then(() => InspectorTest.log('InjectedSciptSource was not reached'))
  .then(InspectorTest.completeTest);
