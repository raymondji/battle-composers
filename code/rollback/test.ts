interface SimpleGameState {
  p1: string;
  p2: string;
}
function test() {
  const engine = new RollbackGameEngine<SimpleGameState, string>(
    'P1',
    () => 'a',
    (gs: SimpleGameState) => console.log('Rendering, game state: ', gs),
    (startingState, inputs) => {
      let p1 = startingState.p1;
      let p2 = startingState.p2;
      if (inputs.has('P2')) {
        p2 += inputs.get('P2');
        p1 += inputs.get('P2');
      }
      if (inputs.has('P1')) {
        p1 += inputs.get('P1');
      }
      return {
        p1,
        p2,
      };
    },
    { p1: '', p2: '' }
  );

  console.log('==========');
  engine.tick();
  engine.tick();
  engine.tick();
  engine.addRemoteInputs(2, 'P2', 'b');
  engine.addRemoteInputs(3, 'P2', 'c');
  engine.tick();
  engine.tick();
  engine.tick();
  engine.addRemoteInputs(4, 'P2', 'd');
  engine.tick();
  engine.addRemoteInputs(6, 'P2', 'd');
  engine.tick();
}