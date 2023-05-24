set -e

mongosh <<EOF
use admin

db.createUser({
  user: '$HOT_USERNAME',
  pwd:  '$HOT_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF
