package vttp2022.assessment.csf.orderbackend.repositories;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;

@Repository
public class OrderRepository {

    public final static String SQL_ADD_ORDER = "insert into orders values (?, ?, ?, ?, ?, (?), ?)";

    public final static String SQL_GET_ORDER_BY_EMAIL = "select order_id, email from orders where email = ?";
    
    @Autowired 
    private JdbcTemplate template;

    public Integer orderCreated(Order order){
        int count = template.update(SQL_ADD_ORDER, order.getName(), order.getEmail(),
        order.getSize(), order.isThickCrust(), order.getSauce(), order.getToppings(), order.getComments());

        return count;
    }

    public List<OrderSummary> getOrderByEmail(String email){

        List<OrderSummary> orderList = new LinkedList<>();

        final SqlRowSet rs = template.queryForRowSet(SQL_GET_ORDER_BY_EMAIL, email);

        while (rs.next()){
            OrderSummary orderSummary = OrderSummary.createFromRowSet(rs);
            orderList.add(orderSummary);
        }
        return orderList;
    }
}
