package com.example.tazkarti.controller;

import com.example.tazkarti.dto.TeamDto;
import com.example.tazkarti.dto.UpdateUserAccountStatusDto;
import com.example.tazkarti.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/admins"})
public class AdminController {
    @Autowired
    private AdminService adminService;
    @PutMapping("/{adminId}/users/{userId}")
    public ResponseEntity<String> updateUserAccountStatus(@PathVariable Long userId,HttpServletRequest request, @Valid @RequestBody UpdateUserAccountStatusDto updateUserAccountStatusDto){
        Long adminId = (Long)request.getAttribute("userId");
        adminService.updateAccountStatus(adminId, updateUserAccountStatusDto,userId);
        return ResponseEntity.ok("User account status updated successfully");
    }



    @DeleteMapping("/{adminId}/users/{userId}")
    public ResponseEntity<String> removeUser(@PathVariable Long userId,HttpServletRequest request){
        Long adminId = (Long)request.getAttribute("userId");
        adminService.removeUser(adminId,userId);
        return ResponseEntity.ok("Removed user successfully");
    }

    @PostMapping("/{adminId}/teams")
    public ResponseEntity<String> addTeam(HttpServletRequest request, @Valid @RequestBody TeamDto teamDto){
        Long adminId = (Long)request.getAttribute("userId");
        adminService.addTeam(adminId,teamDto);
        return ResponseEntity.ok("Team added successfully");
    }
}
