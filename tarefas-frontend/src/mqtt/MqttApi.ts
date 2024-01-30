import {useEffect} from "react";
import mqtt from "mqtt";
    interface IMensagem {
        topic:string;
        qos:string;
        name: string;
    }
    const connect = () => {
        return mqtt.connect( "ws://54.147.171.16:9001",{
            protocol:"ws",
            clientId: "mqttjs_" + Math.random().toString(16),
            username:"anonymous",
            password:"anonymous"
        });
    }
    const subscribe = (subscription: mqtt.ISubscriptionRequest,client:mqtt.MqttClient) => {
        if (client) {
            const {topic, qos} = subscription;
            client.subscribe(topic, {qos}, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
            });
        }
    }
const publish = (context: mqtt.IPublishPacket, client: mqtt.MqttClient) => {
    if (client) {
        const {topic, qos, payload} = context;
        client.publish(topic, payload, {qos}, error => {
            if (error) {
                console.log('Publish error: ', error);
            }
        });
    }
}
export const MqttApi = {
        connect,
        subscribe,
        publish,

}
