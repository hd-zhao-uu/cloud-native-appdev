export aws_url=http://tms-te-Publi-Uzf1liJ2jFCi-1483732284.eu-north-1.elb.amazonaws.com
cur_id=$(curl -sX POST ${aws_url}/content-request -H "Content-Type: application/json" -d @test-data/request.json | \
    python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["id"]);')
res=$(curl -s http://tms-te-Publi-Uzf1liJ2jFCi-1483732284.eu-north-1.elb.amazonaws.com/content-request/${cur_id})
echo ${res}
