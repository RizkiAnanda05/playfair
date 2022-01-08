function res(){
    var resl = document.getElementById("result");
    resl.value = encryption();
}
function getKey(){
    var key = document.getElementById("key").value;
    return key;
}
function getString(){
    return document.getElementById("plain").value;
}
function matrikskey(){
    var key = getKey().toLowerCase();
    const alfabet = "abcdefghiklmnopqrstuvwxyz";
    key += alfabet;
    for(let i = 0 ; i < key.length; i++){
        if (key.indexOf(key[i]) !== i){
            key = key.slice(0, i) + key.slice(i + 1);
            i--;
        }
    }
    return key;
}
function plainedit(){
    var plaintext = getString().toLowerCase().replace(/\s/g,'');
    for (let i = 0 ; i < plaintext.length - 1 ; i += 2){
        if(plaintext[i] === plaintext[i + 1]){
            plaintext = plaintext.slice(0, i + 1) + "x" + plaintext.slice(i + 1);

        }
    }
    if (plaintext.length % 2 === 1){
        plaintext += "x"
    }
    plaintext = plaintext.replace(/j/g , "i");
    return plaintext;
}
function encryption(){
    var resl = document.getElementById("result");
    var plain = plainedit();
    var key = matrikskey();
    var cipher = "";
    for (var i = 0 ; i < plain.length - 1 ; i += 2){
        var k1,k2,b1,b2;
        k1 = key.indexOf(plain[i]) / 5 | 0;
        b1 = key.indexOf(plain[i]) % 5;
        k2 = key.indexOf(plain[i + 1]) / 5 | 0; 
        b2 = key.indexOf(plain[i + 1]) % 5;

        if(k1 === k2)
            cipher += key[k1 * 5 + (b1 + 1) % 5] + key[k2 * 5 + (b2 + 1) % 5];
        
        else if(b1 === b2)
            cipher += key[((k1 + 1 )%5)*5 + b1] + key[((k2 + 1)%5)*5 +k2];
        else 
            cipher += key[k1 * 5 + b2] + key[k2 * 5 + b1];
    }
    resl.innerHTML = cipher;
    
}
function decrypt(){
    var resl = document.getElementById("result");
    var plain = plainedit();
    var key = matrikskey();
    var cipher = "";
    for (var i = 0 ; i < plain.length - 1 ; i += 2){
        var k1,k2,b1,b2;
        k1 = key.indexOf(plain[i]) / 5 | 0;
        b1 = key.indexOf(plain[i]) % 5;
        k2 = key.indexOf(plain[i + 1]) / 5 | 0; 
        b2 = key.indexOf(plain[i + 1]) % 5;

        if(k1 === k2)
            cipher += key[k1 * 5 + (b1  + 4) % 5] + key[k2 * 5 + (b2 + 4) % 5];
        
        else if(b1 === b2)
            cipher += key[((k1 + 4  )%5)*5 + b1] + key[((k2 + 4) % 5) * 5 + k2];
        else 
            cipher += key[k1 * 5 + b2] + key[k2 * 5 + b1];

    }
    resl.innerHTML = cipher;
}