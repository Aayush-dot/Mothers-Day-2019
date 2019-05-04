function lensFlares() {
    var light = new THREE.PointLight(0xE7E06D, 1.5, 2000);
    
    var textureLoader = new THREE.TextureLoader();
    
    var textureFlare0 = textureLoader.load('textures/lensflare0.png');
    var textureFlare1 = textureLoader.load('textures/lensflare2.png');
    var textureFlare2 = textureLoader.load('textures/lensflare3.png');
    
    var lensFlare = new THREE.Lensflare();
    
    lensFlare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) );
    lensFlare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
    lensFlare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );
    
    light.add(lensFlare);
    
}