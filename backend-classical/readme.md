## Setup

1. Create a .env file and copy-paste keys from .env.example to .env file

2. Select the algorithm you want to use, i.e. HS256, RS256, ES256, PS256

3. Generate the public key and private key using the following commands if you're using asymmetric algorithm:

   RSA:

   ```bash
       $ ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key

       $ openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

       $ cat jwtRS256.key

       $ cat jwtRS256.key.pub
   ```

   ES:

   ```bash
       $ openssl ecparam -name prime256v1 -genkey -noout -out private_key.pem

       $ openssl ec -in private_key.pem -pubout -out public_key.pem
   ```

   PS:

   ```bash
       $ openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

       $ openssl rsa -pubout -in private_key.pem -out public_key.pem
   ```

4. Paste the PRIVATE_KEY AND PUBLIC_KEY from the files generated.

5. If you're using symmetric algorithm, i.e. HS256, the PRIVATE_KEY AND PUBLIC_KEY must be same.

6. npm start
