var JetSprite = cc.Sprite.extend({
  _currentRotation:0,

  ctor:function(){
    this._super();
    this.initWithFile(s_jet);
  },

  update:function(dt){
    this.setRotation(this._currentRotation);
  },

  handleKey:function(e)
  {
    if(e === cc.KEY.left)
    {
      this._currentRotation--;

    }
    else if(e === cc.KEY.right)
      this._currentRotation++;

    if(this._currentRotation < 0) this._currentRotation = 360;
    if(this._currentRotation > 360) this._currentRotation = 0;
  },

  handleTouch:function(touchLocation)
  {
    if(touchLocation.x < 300)
      this._currentRotation = 0;
    else
      this._currentRotation = 180;
  },

  handleTouchMove:function(touchLocation){
    // Gross use of hardcoded width,height params.
    var angle = Math.atan2(touchLocation.x - 300,
                           touchLocation.y - 300);

    angle = angle * (180/Math.PI);
    this._currentRotation = angle;

  }
});

var MenuLayer = cc.LayerColor.extend({
    init:function()
    {
        this._super(new cc.Color4B(0, 0, 0, 255));

        var size = cc.Director.getInstance().getWinSize();

        audio_engine = cc.AudioEngine.getInstance();

        audio_engine.setEffectsVolume(0.5);
        audio_engine.setMusicVolume(0.5);

        var menuItem1 = new cc.MenuItemFont.create("Play Sound", this.playSound, this);
        var menuItem2 = new cc.MenuItemFont.create("Play Song", this.playSong, this);
        var menuItem3 = new cc.MenuItemFont.create("Stop Playing Song", this.stopPlayingSound, this);
        var menuItem4 = new cc.MenuItemFont.create("Exit", this.exit, this);

        menuItem1.setPosition(new cc.Point(size.width / 2, size.height / 2+50));
        menuItem2.setPosition(new cc.Point(size.width / 2, size.height / 2));
        menuItem3.setPosition(new cc.Point(size.width / 2, size.height / 2-50));
        menuItem4.setPosition(new cc.Point(size.width / 2, size.height / 2-100));

        var menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4);
        menu.setPosition(new cc.Point(0, 0));

        this.addChild(menu);

        return this;
    },
    playSound:function(){
        cc.log("Playing sound");
        audio_engine.playEffect(s_effect);
    },
    playSong:function(){
        cc.log("Playing song");
        audio_engine.playMusic(s_background_music);
    },
    stopPlayingSound:function(){
        cc.log("Done playing song");
        if(audio_engine.isMusicPlaying())
        {
            cc.log("Stoping song");
            audio_engine.stopMusic();
        }
        else {
            cc.log("Music is not playing");
        }
    },
    exit:function(){
      cc.log("Exit");
    }
});

MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});
