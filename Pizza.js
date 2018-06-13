//=============================================================================
// Pizza.js
//=============================================================================

/*:ja
 * @plugindesc ピザ屋のウェブサイトを開きます
 * @author yusuke-n(＠yamket)
 *
 * @param brand
 * @desc ピザ屋のブランドです。"domino", "hat", "pizzala"を指定できます。それ以外の値の場合はdominoを開きます。
 * @default domino
 *
 * @help
 *
 * プラグインコマンド:
 *  Pizza set brand  # ブランドを設定します.
 *  Pizza open       # ピザウィンドウを開きます.
 *  Pizza close      # ピザウィンドウを閉じます.
 */

(function() {
  const PNAME = 'Pizza';

  var params = PluginManager.parameters(PNAME);
  var url = 'https://www.dominos.jp/';
  setBrand(params.brand);

  var orig_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    orig_pluginCommand.call(this, command, args);
    if(command === 'Pizza') {
      switch(args[0]) {
        case 'set':
          setBrand(args[1]);
          break;
        case 'open':
          closePizzaWindow();
          openPizzaWindow();
          break;
        case 'close':
          closePizzaWindow();
          break;
      }
    }
  };

  var orig_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
    orig_makeCommandList.call(this);
    this.addCommand("Pizza", 'pizza');
  };

  var orig_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    orig_createCommandWindow.call(this);
    this._commandWindow.setHandler('pizza', openPizzaWindow);
  };

  // この辺prototypeに持たせる必要ある？
  function openPizzaWindow() {
    var body = document.getElementsByTagName("body")[0];
    var iframe = document.createElement("iframe");
    iframe.setAttribute('nwdisable', '');
    iframe.setAttribute('nwfaketop', '');
    iframe.setAttribute('src', url);
    iframe.setAttribute('style', 'position: absolute; width: 50%; height: 95%; z-index: 99;');
    body.appendChild(iframe);
  };

  function closePizzaWindow() {
    var iframes = document.getElementsByTagName("iframe");
    for(var i = 0; i<iframes.length; i++) {
      iframes[i].remove();
    }
  };

  function setBrand(brand) {
    switch (brand) {
      case "hat":
        url = 'https://pizzahut.jp';
        break;
      case "pizzala":
        url = 'https://www.pizza-la.co.jp/';
        break;
      default:
        url = 'https://www.dominos.jp/';
        break;
    }
  };

})();
