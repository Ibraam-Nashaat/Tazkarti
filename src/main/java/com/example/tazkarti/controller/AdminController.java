package com.example.tazkarti.controller;

import com.example.tazkarti.dto.AuthResponseDto;
import com.example.tazkarti.dto.RemoveUserDto;
import com.example.tazkarti.dto.UpdateUserAccountStatusDto;
import com.example.tazkarti.dto.UserDto;
import com.example.tazkarti.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/admins"})
public class AdminController {
    @Autowired
    private UserService userService;
    @PutMapping("/{adminId}")
    public ResponseEntity<String> updateUserAccountStatus(HttpServletRequest request, @Valid @RequestBody UpdateUserAccountStatusDto updateUserAccountStatusDto){
        Long adminId = (Long)request.getAttribute("userId");
        userService.updateAccountStatus(adminId, updateUserAccountStatusDto);
        return ResponseEntity.ok("User account status updated successfully");
    }

    @DeleteMapping("/{adminId}")
    public ResponseEntity<String> removeUser(HttpServletRequest request, @Valid @RequestBody RemoveUserDto removeUserDto){
        Long adminId = (Long)request.getAttribute("userId");
        userService.removeUser(adminId,removeUserDto);
        return ResponseEntity.ok("Removed user successfully");
    }
}
