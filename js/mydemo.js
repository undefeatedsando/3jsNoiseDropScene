var c = document.querySelector('#scene');
console.log("Hello")
var colors = [new THREE.Color(0xaa8a9a)];
var renderer = new THREE.WebGLRenderer({
  canvas: c,
  antialias: true
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
camera.position.set(0, 0, 900);
renderer.setClearColor(colors[0]);


/*GEOMETRY*/
var group = new THREE.Group();

var kakaGeo = new THREE.IcosahedronGeometry(120,4);
for(var i = 0; i < kakaGeo.vertices.length; i++) {
    var vector = kakaGeo.vertices[i];
    vector._o = vector.clone();  
}

var kakaMat = new THREE.MeshPhongMaterial({
    //emissive: 0x23f660, 
    //emissiveIntensity: 0.5,
    //specular: 0x050505,
    shininess: 100
})

var kaka = new THREE.Mesh(kakaGeo,kakaMat);
//group.add(kaka);
scene.add(kaka);


/*LIGHTS*/
var light = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6);
scene.add(light);

var light = new THREE.DirectionalLight(0x590D82, 0.5);
light.position.set(200, 300, 400); 
scene.add(light);
var light2 = light.clone();
light2.position.set(-200, 300, 400); 
scene.add(light2);


function updateVertices (a) {
    for(var i = 0; i < kakaGeo.vertices.length; i++) {
        var vector = kakaGeo.vertices[i];
        vector.copy(vector._o);
        var perlin = noise.simplex3(
            //(vector.x * 0.006) + (a * 0.0002),
            //(vector.y * 0.006) + (a * 0.0003),
            //(vector.z * 0.006)
          vector.x*0.05+(a * 0.0003), vector.x*0.05, 1
          //i*0.006 + (a * 0.0002),i*0.0006 + (a * 0.0002),i*0.0006 + (a * 0.0002)
        );
      
        var ratio = ((perlin*0.4 ) + 0.8);
        vector.multiplyScalar(ratio);
    }
    kakaGeo.verticesNeedUpdate = true;
}
/*

renderer.render(scene,camera);
*/
updateVertices(1);
renderer.render(scene, camera);

var time=0;
function render(a) {
    time++;
    updateVertices(a);
    requestAnimationFrame(render);
    updateVertices(a);
    kaka.rotation.y = (time/300);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);

