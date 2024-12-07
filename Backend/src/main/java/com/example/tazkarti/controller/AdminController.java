package com.example.tazkarti.controller;

import com.example.tazkarti.dto.GeneralResponseDto;
import com.example.tazkarti.dto.GetUserDto;
import com.example.tazkarti.dto.TeamDto;
import com.example.tazkarti.dto.UpdateUserAccountStatusDto;
import com.example.tazkarti.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/admins"})
public class AdminController {
    @Autowired
    private AdminService adminService;
    @PutMapping("/{adminId}/users/{userId}")
    public ResponseEntity<GeneralResponseDto> updateUserAccountStatus(@PathVariable Long userId,HttpServletRequest request, @Valid @RequestBody UpdateUserAccountStatusDto updateUserAccountStatusDto){
        Long adminId = (Long)request.getAttribute("userId");
        adminService.updateAccountStatus(adminId, updateUserAccountStatusDto,userId);
        return ResponseEntity.ok(new GeneralResponseDto("User account status updated successfully"));
    }



    @DeleteMapping("/{adminId}/users/{userId}")
    public ResponseEntity<GeneralResponseDto> removeUser(@PathVariable Long userId,HttpServletRequest request){
        Long adminId = (Long)request.getAttribute("userId");
        adminService.removeUser(adminId,userId);
        return ResponseEntity.ok(new GeneralResponseDto("Removed user successfully"));
    }

    @PostMapping("/{adminId}/teams")
    public ResponseEntity<GeneralResponseDto> addTeam(HttpServletRequest request, @Valid @RequestBody TeamDto teamDto){
        Long adminId = (Long)request.getAttribute("userId");
        adminService.addTeam(adminId,teamDto);
        return ResponseEntity.ok(new GeneralResponseDto("Team added successfully"));
    }

    @GetMapping("/{adminId}/users")
    public ResponseEntity<List<GetUserDto>> getAllUsers(HttpServletRequest request){
        Long adminId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(adminService.getAllUsers(adminId));
    }

    @GetMapping("/{adminId}/users/{userId}")
    public ResponseEntity<GetUserDto> getUserById(HttpServletRequest request,@PathVariable Long userId){
        Long adminId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(adminService.getUserById(adminId,userId));
    }
}
