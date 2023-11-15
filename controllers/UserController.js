

const express = require('express');
const app = express();
const firebase = require('firebase');

const firebaseConfig = {
    "type": "service_account",
    "project_id": "soundbox-du-an-md31",
    "private_key_id": "5f4f0680b94e217e9805c83f17e1d1d9324e9111",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3qg1EA8vZHwak\nTTgufzU0iBhOXuntp0/qQn5WJKDqWomoAR1in/gkJm5YiF9bdsYmXjz4wmQtc5Zq\noVFh/ZlrS5DFGFJM33gC7VjZtWAYpsRRGVzSTINkv7hDRGwn/d6mzKi8cH54JGKR\nsLcueMsP1az2+DYC2dD8FOX78nWgom1iOtD9CE3XTj/5CdNvnFMTi7hZhIxNutGp\nsi4ziU3IOJ8odYfiYsLpox0uscLr145cx2k4E5GTAqAZSW0PvGx9CD5hA8qSFERr\n+mb+MWinkLRCduggVO0//amWj8TQseNubjR+FB1mFVJ9aPlnMTV0Pvg0IcTg/Rgi\nf6YnZJjtAgMBAAECggEAKzym9VNQdqtxaJX+KyIKwDRmxnJdLzOjYlJng/eJA0qv\nm+OxS4G9zKLYeNKX4kQWlzs5rtUyeKm8qBsUedVV+/aU3PViEJNOISBHea8TcZI2\n5qGqIp7dEsd4hStzK8H927YT5hK0jyt/oe0gXpoUscRbfOOHcYneAy4XS0Xzr44O\nVAgwdZN1g0e860aD+rIru8leaPOa67GnJ2TrieQh54VpJF8Lnfdx95vtP1JYFnzk\nGTB2gqzG5qzabg+Sogiru89jNak4B3pLIZqiify/LPBQ2cPjDdHJ6Op7aIMQQVAJ\nChyuo0bthXTmapnu5Gr10qylsOuJR/6uRDrvtEK4MQKBgQD4vVYWmKUBVfPkQLcb\nadGh7AQ1Q8C6+u/rWEpG1zR1ZbsYbwLL/WR3SCqzPr6vPgbnjH7AhoLJH18OlRHw\nPj9X4OrjVc5TBElmoQgonHH8JobL7ypBk6mIsBMS+ut5ORJ3j2/QbiA2YGU7XFJA\nMVerw5v7ecSHm0n1wGFvOZ3L3QKBgQC9BnOMPRbAACf7o2znBMPA0JBmATXNAzhM\nqIafXwZigYWu4ggJlAstQrfYy3S7P+udHAvRUKMlX3p7iVGsEr9rNWxRJCH0Z3hI\nEW2797SxnV38yHusf7Ap4+pvAC/pgVNHYXkGbuV9m/RuM19eEmwQ65I1uC7AOjSj\nSogtm834UQKBgQCmTaiGOQ5xQy9qV15VRL20/eCeYCs2mFnaRtB6Zp4bM6YQowAC\ntOr72VM7PmMtNVJWc5e3TveYUpIyZLZ2opelQKqqzg7BcGdG57lVtat8A6IyLTha\nWciKq/ZExWC0TtUq/MqsV0TQNkjYlFQluRe9rm3Wh8Y/SDL9zN8YBzSaPQKBgDmu\noU4XSjz3Dzx0B4SL6KyLOLVYAzH3nJOQDdzOY6VlvwS6BxfdLHf4Vx/6HjoR7HV6\nHIUYZWC/PSI7qkenRPCTUeWE8DOj64maf/EPSv20dvzvtQXTxU9TNLQAy54nD+HF\ndegnqTJmh/WlCaIsXvve1zQ7a1DPskZuNRYt6HGxAoGAC82BpSNt3Wr42b07d1WM\n9cPWeW2hrObICmztALjTDAIv247KR8tg55pl5OlMQNt/iQjpNs24LAyj2lmBtvjE\nkPj2wFC1h02Tvf1Gy2AuANtDxAnRQBhE6Di5v7Nmc+bgi1OjXGdbrKHa9TltTGI/\njdy2+qNpYhkVE3QVfilBems=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-w2i31@soundbox-du-an-md31.iam.gserviceaccount.com",
    "client_id": "110070675168927238376",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w2i31%40soundbox-du-an-md31.iam.gserviceaccount.com",
    "databaseURL": "https://soundbox-du-an-md31-default-rtdb.firebaseio.com/",
    "universe_domain": "googleapis.com"
  };
  

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const dataRef = database.ref('/users');

app.get('/', async (req, res) => {
  try {
    const snapshot = await dataRef.once('value');
    const data = snapshot.val();
    const usersArray = Object.keys(data).map(key => ({ key, ...data[key] }));

    res.render('user/user', { user: usersArray });
    console.log(usersArray);
    //console.log(data);
  } catch (error) {
    console.error('Error getting data from Firebase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/delete/:slug', async (req, res) => {
    const id = parseInt(req.params.slug, 10);
    
    try {
      await dataRef.child(id).set(null);
      console.log("Xóa thành công " + id);
      res.send("Xóa thành công " + id); 
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      res.status(500).send("Lỗi khi xóa dữ liệu");  
    }
  });

  


module.exports = app;