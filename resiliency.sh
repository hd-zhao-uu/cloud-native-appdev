
AWS_LB_URL=http://tms-te-Publi-Uzf1liJ2jFCi-1483732284.eu-north-1.elb.amazonaws.com
curl -X POST ${AWS_LB_URL}/toggle-health
ab -n 10 -T application/json -p test-data/request.json ${AWS_LB_URL}/content-request
