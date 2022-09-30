package vttp2022.assessment.csf.orderbackend.controllers;

import java.io.ByteArrayInputStream;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.models.Response;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderRestController {

    @Autowired
    private OrderService orderSvc;

    @PostMapping(path="/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addOrder(@RequestBody String payload){

        JsonReader reader = Json.createReader(new ByteArrayInputStream(payload.getBytes()));

        JsonObject obj;

        Response resp = new Response();

        try{
            obj = reader.readObject();
        } catch (Exception e){
            resp.setCode(400);
            resp.setMessage("error with payload");
            return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Response.toJson(resp).toString());
        }

        Order order = Order.create(obj);

        try{
            orderSvc.createOrder(order);
            resp.setCode(HttpStatus.OK.value());
            resp.setMessage("Order has been successfully created");
        } catch(Exception e){
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage("Error in creating order");
        }

        return ResponseEntity
                    .status(resp.getCode())
                    .body(Response.toJson(resp).toString());
    }

    @GetMapping(path="/orders/{email}/all")
    public ResponseEntity<String> getOrders(@PathVariable String email){
        
        List<OrderSummary> orderList = orderSvc.getOrdersByEmail(email);
       
        List<JsonObject> objectList = new LinkedList<>();

        for (OrderSummary orderSummary: orderList){
            System.out.println(">>>>>" + orderSummary.getEmail());
            objectList.add(OrderSummary.toJson(orderSummary));
        }
        return ResponseEntity.ok().body(objectList.toString());
    }



}
