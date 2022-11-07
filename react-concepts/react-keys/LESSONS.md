# LESSONS

- When the key matches the object being rendered you can prevent remounting component again

- Using the row.id as the key will always match the related object

- Using the index as key will not match related object when deleting list elements or sorting

- React will not render using state when the reference has not changed - updating the
  contents of a list does not change the reference to the list. You can force rendering
  by passing `list.slice(0)` to setState (creates a new array and reference).
