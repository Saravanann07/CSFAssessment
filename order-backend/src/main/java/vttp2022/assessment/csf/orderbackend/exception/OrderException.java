package vttp2022.assessment.csf.orderbackend.exception;

public class OrderException extends Exception{

    private String reason;

    public OrderException(String reason){
        this.reason = reason;
    }

    public String getReason(){
        return reason;
    }
    
}
