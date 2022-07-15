export class ApiSetting{
    public static get UserApiEndPoint(){
        return 'http://192.168.100.233:8079';
    }

    public static get InventoryApiEndPoint(){
        return 'http://192.168.100.233:8078';
    }

    public static get RedisDataEndPoint(){
        return 'redis://default:redis-14451.c16.us-east-1-3.ec2.cloud.redislabs.com:14451@redis-14451.c16.us-east-1-3.ec2.cloud.redislabs.com:14451'
    }

    public static get payRollApi(){
        return 'http://192.168.100.43:8098'
        //return 'http://svr:8098'
    }


}
